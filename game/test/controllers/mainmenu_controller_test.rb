require 'test_helper'

class MainmenuControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get mainmenu_index_url
    assert_response :success
  end

end
