# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'csv'

csv_text = File.read(Rails.root.join('db', 'TBL_IMV_ROCA.csv'))
csv = CSV.parse(csv_text, :headers => true, :encoding => 'UTF-8')

imported_rows = 0

csv.each do |row|
  # row = csv[n]
  # h = Realty.new
  # t.street = row['street']
  # t.city = row['city']
  # t.zip = row['zip']
  # t.zip = row['zip']
  # t.state = row['state']
  # t.beds = row['beds']
  # t.sq_feet = row['sq_feet']
  # t.category = row['type']
  # t.sale_date = row['sale_date']
  # t.price = row['price']
  # t.lat = row['latitude']
  # t.lng = row['longitude']
  # t.save
  # puts "#{t.street}, #{t.city} saved"
  # cols = ['IMVCODIGO', 'IMVLATITUDEGPS', 'IMVLONGITUDEGPS', 'IMVEDIFICIO', 'IMVDESCRICAO', 'IMVBAIRRO', 'IMVCOMPLEMENTO', 'IMVDESCRICAOATUAL']

  # IMVCODIGO -> roca_id
  # IMVLATITUDEGPS -> latitude
  # IMVLONGITUDEGPS -> longitude
  # IMVDESCRICAO -> address
  # IMVEDIFICIO -> building
  # IMVCOMPLEMENTO -> complement
  # IMVBAIRRO -> district

  # IMVDESCRICAOATUAL -> description

  # finds out realty price
  price = 0.0
  if row['AD_VALORADM'] && !row['AD_VALORADM'].empty?
    price = row['AD_VALORADM'].to_f * 10.0
  elsif row['AD_VALORLIQPROP'] && !row['AD_VALORLIQPROP'].empty?
    price = row['AD_VALORLIQPROP'].to_f
  end

  r = Realty.new
  r.roca_id = row['IMVCODIGO']
  r.latitude = row['IMVLATITUDEGPS']
  r.longitude = row['IMVLONGITUDEGPS']
  r.address = row['IMVDESCRICAO']
  r.building = row['IMVEDIFICIO']
  r.complement = row['IMVCOMPLEMENTO']
  r.district = row['IMVBAIRRO']
  r.description = row['IMVDESCRICAOATUAL']
  r.price = price

  imported_rows += 1 if r.save
end

puts "#{imported_rows} linhas importadas para o banco"
