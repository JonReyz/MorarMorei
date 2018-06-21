require 'test_helper'

class RealtiesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @realty = realties(:one)
  end

  test "should get index" do
    get realties_url
    assert_response :success
  end

  test "should get new" do
    get new_realty_url
    assert_response :success
  end

  test "should create realty" do
    assert_difference('Realty.count') do
      post realties_url, params: { realty: { address: @realty.address, building: @realty.building, complement: @realty.complement, description: @realty.description, district: @realty.district, latitude: @realty.latitude, longitude: @realty.longitude, roca_id: @realty.roca_id } }
    end

    assert_redirected_to realty_url(Realty.last)
  end

  test "should show realty" do
    get realty_url(@realty)
    assert_response :success
  end

  test "should get edit" do
    get edit_realty_url(@realty)
    assert_response :success
  end

  test "should update realty" do
    patch realty_url(@realty), params: { realty: { address: @realty.address, building: @realty.building, complement: @realty.complement, description: @realty.description, district: @realty.district, latitude: @realty.latitude, longitude: @realty.longitude, roca_id: @realty.roca_id } }
    assert_redirected_to realty_url(@realty)
  end

  test "should destroy realty" do
    assert_difference('Realty.count', -1) do
      delete realty_url(@realty)
    end

    assert_redirected_to realties_url
  end
end
