class UserSerializer < ActiveModel::Serializer
  has_many :scores
  attributes :id, :gamer_tag
end
