Rails.application.routes.draw do
  resources :realties
  resources :markers
  get 'signup', to: 'users#new', as: 'signup'
  get 'login', to: 'sessions#new', as: 'login'
  get 'logout', to: 'sessions#destroy', as: 'logout'

  post 'login', to: 'sessions#create'
  post 'signup', to: 'users#create'

  

  get 'welcome/index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'map#index'
end
