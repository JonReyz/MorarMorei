class RealtiesController < ApplicationController
  before_action :set_realty, only: [:show, :edit, :update, :destroy]

  # GET /realties
  # GET /realties.json
  def index
    @realties = Realty.all
  end

  # GET /realties/1
  # GET /realties/1.json
  def show
  end

  # GET /realties/new
  def new
    @realty = Realty.new
  end

  # GET /realties/1/edit
  def edit
  end

  # POST /realties
  # POST /realties.json
  def create
    @realty = Realty.new(realty_params)

    respond_to do |format|
      if @realty.save
        format.html { redirect_to @realty, notice: 'Realty was successfully created.' }
        format.json { render :show, status: :created, location: @realty }
      else
        format.html { render :new }
        format.json { render json: @realty.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /realties/1
  # PATCH/PUT /realties/1.json
  def update
    respond_to do |format|
      if @realty.update(realty_params)
        format.html { redirect_to @realty, notice: 'Realty was successfully updated.' }
        format.json { render :show, status: :ok, location: @realty }
      else
        format.html { render :edit }
        format.json { render json: @realty.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /realties/1
  # DELETE /realties/1.json
  def destroy
    @realty.destroy
    respond_to do |format|
      format.html { redirect_to realties_url, notice: 'Realty was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_realty
      @realty = Realty.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def realty_params
      params.require(:realty).permit(:roca_id, :latitude, :longitude, :address, :building, :complement, :district, :description)
    end
end
