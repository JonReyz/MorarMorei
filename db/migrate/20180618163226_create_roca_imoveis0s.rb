class CreateRocaImoveis0s < ActiveRecord::Migration[5.2]
  def change
    create_table :roca_imoveis0s do |t|
      t.float :latitude
      t.float :longitude
      t.string :descricao
      t.integer :code

      t.timestamps
    end
  end
end
