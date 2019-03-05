# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string
#  email           :string
#  password_digest :string
#  session_token   :string
#  pro_account     :boolean          default(FALSE)
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#

class User < ApplicationRecord
  validates :username, :email, :session_token, :password_digest, presence: true
  validates :pro_account, inclusion: { in: [ true, false ] }
  validates :password, length: { minimum: 8, allow_nil: true }

  has_many :administered_albums,
    class_name: 'Album',
    foreign_key: :administrator_id

  has_many :administered_tracks,
    through: :administered_albums,
    source: :tracks

  after_initialize :ensure_session_token

  attr_reader :password

def self.find_by_credentials(username, password)
    user = User.includes(:administered_albums).find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save!
    self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
