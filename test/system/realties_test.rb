require "application_system_test_case"

class RealtiesTest < ApplicationSystemTestCase
  setup do
    @realty = realties(:one)
  end

  test "visiting the index" do
    visit realties_url
    assert_selector "h1", text: "Realties"
  end

  test "creating a Realty" do
    visit realties_url
    click_on "New Realty"

    fill_in "Address", with: @realty.address
    fill_in "Building", with: @realty.building
    fill_in "Complement", with: @realty.complement
    fill_in "Description", with: @realty.description
    fill_in "District", with: @realty.district
    fill_in "Latitude", with: @realty.latitude
    fill_in "Longitude", with: @realty.longitude
    fill_in "Roca", with: @realty.roca_id
    click_on "Create Realty"

    assert_text "Realty was successfully created"
    click_on "Back"
  end

  test "updating a Realty" do
    visit realties_url
    click_on "Edit", match: :first

    fill_in "Address", with: @realty.address
    fill_in "Building", with: @realty.building
    fill_in "Complement", with: @realty.complement
    fill_in "Description", with: @realty.description
    fill_in "District", with: @realty.district
    fill_in "Latitude", with: @realty.latitude
    fill_in "Longitude", with: @realty.longitude
    fill_in "Roca", with: @realty.roca_id
    click_on "Update Realty"

    assert_text "Realty was successfully updated"
    click_on "Back"
  end

  test "destroying a Realty" do
    visit realties_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Realty was successfully destroyed"
  end
end
