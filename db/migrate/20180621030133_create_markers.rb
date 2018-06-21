class CreateMarkers < ActiveRecord::Migration[5.2]
  def change
    create_table :markers do |t|
      t.string :address
      t.float :latitude
      t.float :longitude
      t.string :description
      t.boolean :positive

      t.timestamps
    end
  end
end
