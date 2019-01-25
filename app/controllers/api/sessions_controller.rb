class Api::SessionsController < ApplicationController

  def create
    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password])
    if @user
      @albums = @user.administered_albums
      sign_in(@user)
      render 'api/users/show'
    else
      render json: ["We didn’t recognize that username or password.\nPlease try again."], status: 401
    end
  end

  def destroy
    signout
    # render "api/users/show"
  end

end
