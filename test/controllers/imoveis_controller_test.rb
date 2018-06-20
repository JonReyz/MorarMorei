require 'test_helper'

class ImoveisControllerTest < ActionDispatch::IntegrationTest
  setup do
    @imovei = imoveis(:one)
  end

  test "should get index" do
    get imoveis_url
    assert_response :success
  end

  test "should get new" do
    get new_imovei_url
    assert_response :success
  end

  test "should create imovei" do
    assert_difference('Imovei.count') do
      post imoveis_url, params: { imovei: { bairro: @imovei.bairro, cidade: @imovei.cidade, complemento: @imovei.complemento, descricao: @imovei.descricao, id: @imovei.id, latitude: @imovei.latitude, longitude: @imovei.longitude, nro: @imovei.nro, preço: @imovei.preço, rua: @imovei.rua } }
    end

    assert_redirected_to imovei_url(Imovei.last)
  end

  test "should show imovei" do
    get imovei_url(@imovei)
    assert_response :success
  end

  test "should get edit" do
    get edit_imovei_url(@imovei)
    assert_response :success
  end

  test "should update imovei" do
    patch imovei_url(@imovei), params: { imovei: { bairro: @imovei.bairro, cidade: @imovei.cidade, complemento: @imovei.complemento, descricao: @imovei.descricao, id: @imovei.id, latitude: @imovei.latitude, longitude: @imovei.longitude, nro: @imovei.nro, preço: @imovei.preço, rua: @imovei.rua } }
    assert_redirected_to imovei_url(@imovei)
  end

  test "should destroy imovei" do
    assert_difference('Imovei.count', -1) do
      delete imovei_url(@imovei)
    end

    assert_redirected_to imoveis_url
  end
end
