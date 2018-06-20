Rails.application.routes.draw do
 
  resources :sessions

  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  get 'welcome/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'welcome#index'
end

# tutorial que eu to seguindo https://rubyplus.com/articles/4171-Authentication-from-Scratch-in-Rails-5
# continuar de Since this record was created before we added the has_secure_password declaration, it fails. Create another user and login as that user. You will now get the error:
