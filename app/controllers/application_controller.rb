class ApplicationController < ActionController::Base

	private

	def logged_in?
		@current_user ||= User.find_by(id: session[:user_id]) if session[:user_id]
	end

	helper_method :logged_in?
end
