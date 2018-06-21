class Realty < ApplicationRecord
	validates :roca_id, presence: true
	validates :latitude, numericality: true
	validates :longitude, numericality: true
	validates :price, numericality: true
end
