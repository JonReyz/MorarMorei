class ImoveisController < ApplicationController
  before_action :set_imovei, only: [:show, :edit, :update, :destroy]

  # GET /imoveis
  # GET /imoveis.json
  def index
    @imoveis = Imovei.all
  end

  # GET /imoveis/1
  # GET /imoveis/1.json
  def show
  end

  # GET /imoveis/new
  def new
    @imovei = Imovei.new
  end

  # GET /imoveis/1/edit
  def edit
  end

  # POST /imoveis
  # POST /imoveis.json
  def create
    @imovei = Imovei.new(imovei_params)

    respond_to do |format|
      if @imovei.save
        format.html { redirect_to @imovei, notice: 'Imovei was successfully created.' }
        format.json { render :show, status: :created, location: @imovei }
      else
        format.html { render :new }
        format.json { render json: @imovei.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /imoveis/1
  # PATCH/PUT /imoveis/1.json
  def update
    respond_to do |format|
      if @imovei.update(imovei_params)
        format.html { redirect_to @imovei, notice: 'Imovei was successfully updated.' }
        format.json { render :show, status: :ok, location: @imovei }
      else
        format.html { render :edit }
        format.json { render json: @imovei.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /imoveis/1
  # DELETE /imoveis/1.json
  def destroy
    @imovei.destroy
    respond_to do |format|
      format.html { redirect_to imoveis_url, notice: 'Imovei was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_imovei
      @imovei = Imovei.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def imovei_params
      params.require(:imovei).permit(:id, :preço, :latitude, :longitude, :descricao, :rua, :bairro, :cidade, :nro, :complemento)
    end
end
