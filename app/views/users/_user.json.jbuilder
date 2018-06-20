json.extract! user, :id, :email, :senha, :nome, :cpf, :telefone, :created_at, :updated_at
json.url user_url(user, format: :json)
