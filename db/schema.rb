# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2018_06_20_193214) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "imoveis", force: :cascade do |t|
    t.float "preço"
    t.float "latitude"
    t.float "longitude"
    t.string "descricao"
    t.string "rua"
    t.string "bairro"
    t.string "cidade"
    t.string "nro"
    t.string "complemento"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "idRoca"
  end

  create_table "roca_imoveis0s", force: :cascade do |t|
    t.float "latitude"
    t.float "longitude"
    t.string "descricao"
    t.integer "code"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "senha"
    t.string "nome"
    t.string "cpf"
    t.string "telefone"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
