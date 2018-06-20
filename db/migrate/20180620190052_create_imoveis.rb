class CreateImoveis < ActiveRecord::Migration[5.2]
  def change
    create_table :imoveis do |t|
      t.float    :preço
      t.float    :latitude
      t.float    :longitude
      t.string   :descricao
      t.string   :rua
      t.string   :bairro
      t.string   :cidade
      t.string   :nro
      t.string   :complemento

      t.timestamps
    end
  end
end
