require "sinatra"
require "sinatra/reloader" if development?
require "sinatra/json"
require "json"
require "httparty"


set :bind, '0.0.0.0'

get "/" do
  redirect "/home"
end

get "/home" do
  erb :home
end

get "/api/timezones" do
  response = HTTParty.get("http://api.timezonedb.com/v2.1/list-time-zone?key=530HOE073YA1&format=json")
  data = JSON.parse(response&.body || "{}")
  timezone_data = data["zones"].map{|country| country.slice("countryName", "gmtOffset", "zoneName")}
  json timezone_data
end

get "/api/cocktails" do
  cocktail = HTTParty.get("http://www.thecocktaildb.com/api/json/v1/1/random.php")
  random = JSON.parse(cocktail&.body || "{}")

  random_cocktail = random["drinks"][0].slice("idDrink", "strDrink", "strCategory", "strGlass", "strInstructions", "strDrinkThumb", "strIngredient1", "strIngredient2", "strIngredient3", "strIngredient4", "strIngredient5", "strIngredient6", "strIngredient7", "strIngredient8", "strIngredient9", "strIngredient10", "strIngredient11", "strIngredient12", "strIngredient13", "strIngredient14", "strIngredient15", "strMeasure1", "strMeasure2", "strMeasure3", "strMeasure4", "strMeasure5", "strMeasure6", "strMeasure7", "strMeasure8", "strMeasure9", "strMeasure10", "strMeasure11", "strMeasure12", "strMeasure13", "strMeasure14", "strMeasure15")

  json random_cocktail
end

get "*" do
  erb :home
end
