class AddIdRocaToImoveis < ActiveRecord::Migration[5.2]
  def change
    add_column :imoveis, :idRoca, :string
  end
end
