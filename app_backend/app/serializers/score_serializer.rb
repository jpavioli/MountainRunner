class ScoreSerializer < ActiveModel::Serializer
  belongs_to :user
  attributes :id, :user_id, :game_score
end
