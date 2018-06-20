class UsersController < ApplicationController
	def new
		@user = User.new
	end

	def create
		@user = User.new(allowed_params)
		session[:user_id] = @user.id
		if @user.save
			redirect_to root_url, notice: 'Obrigado por se cadastrar!'
		else
			render :new
		end
	end

	private

	def allowed_params
		params.require(:user).permit(:nome, :email, :password, :password_confirmation, :password_digest)
	end
end
