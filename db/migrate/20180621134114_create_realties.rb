class CreateRealties < ActiveRecord::Migration[5.2]
  def change
    create_table :realties do |t|
      t.integer :roca_id, null: false
      t.float :latitude, null: false
      t.float :longitude, null: false
      t.string :address
      t.string :building
      t.string :complement
      t.string :district
      t.string :description

      t.timestamps
    end
  end
end
