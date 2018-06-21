require 'test_helper'

class RealtyTest < ActiveSupport::TestCase
	test "should not save without roca_id" do
		r = Realty.new
		assert_not r.save
	end

	test "should not save without latitude or longitude" do
		r = Realty.new
		r.roca_id = 900
		r.latitude = '15.9'
		r.price = 900.00
		assert_not r.save

		r = Realty.new
		r.roca_id = 900
		r.longitude = '15.9'
		r.price = 900.00
		assert_not r.save

	end

	test "should save a valid realty" do
		r = Realty.new
		r.roca_id = '900'
		r.latitude = '15.9'
		r.longitude = -20.4
		r.price = 900.00
		assert r.save
	end

	test "should not save with a blank latitude or longitude" do
		r = Realty.new
		r.roca_id = 900
		r.latitude = '15.9'
		r.longitude = ''
		r.price = 900.00
		assert_not r.save

		r = Realty.new
		r.roca_id = 900
		r.latitude = ''
		r.longitude = '20.4'
		r.price = 900.00
		assert_not r.save
	end
end
