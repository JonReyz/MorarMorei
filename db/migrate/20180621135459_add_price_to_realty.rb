class AddPriceToRealty < ActiveRecord::Migration[5.2]
  def change
    add_column :realties, :price, :float
  end
end
