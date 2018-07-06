class User < ApplicationRecord
	has_secure_password message: "Insira um Password Válido"
	validates_uniqueness_of :email, message: "E-mail já foi cadastrado"
	validates :email, format: {with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, message: "Formato de e-mail inválido"}
	validates_presence_of :nome, message: 'Campo nome não pode ser deixado em branco'
	validates_presence_of :email, message: 'Campo nome não pode ser deixado em branco'
end
