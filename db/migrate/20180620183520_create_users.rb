class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.string :email
      t.string :senha
      t.string :nome
      t.string :cpf
      t.string :telefone

      t.timestamps
    end
  end
end
