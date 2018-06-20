require "application_system_test_case"

class ImoveisTest < ApplicationSystemTestCase
  setup do
    @imovei = imoveis(:one)
  end

  test "visiting the index" do
    visit imoveis_url
    assert_selector "h1", text: "Imoveis"
  end

  test "creating a Imovei" do
    visit imoveis_url
    click_on "New Imovei"

    fill_in "Bairro", with: @imovei.bairro
    fill_in "Cidade", with: @imovei.cidade
    fill_in "Complemento", with: @imovei.complemento
    fill_in "Descricao", with: @imovei.descricao
    fill_in "Id", with: @imovei.id
    fill_in "Latitude", with: @imovei.latitude
    fill_in "Longitude", with: @imovei.longitude
    fill_in "Nro", with: @imovei.nro
    fill_in "Preço", with: @imovei.preço
    fill_in "Rua", with: @imovei.rua
    click_on "Create Imovei"

    assert_text "Imovei was successfully created"
    click_on "Back"
  end

  test "updating a Imovei" do
    visit imoveis_url
    click_on "Edit", match: :first

    fill_in "Bairro", with: @imovei.bairro
    fill_in "Cidade", with: @imovei.cidade
    fill_in "Complemento", with: @imovei.complemento
    fill_in "Descricao", with: @imovei.descricao
    fill_in "Id", with: @imovei.id
    fill_in "Latitude", with: @imovei.latitude
    fill_in "Longitude", with: @imovei.longitude
    fill_in "Nro", with: @imovei.nro
    fill_in "Preço", with: @imovei.preço
    fill_in "Rua", with: @imovei.rua
    click_on "Update Imovei"

    assert_text "Imovei was successfully updated"
    click_on "Back"
  end

  test "destroying a Imovei" do
    visit imoveis_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Imovei was successfully destroyed"
  end
end
