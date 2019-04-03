
json.array! @new_messages.each do |message|
  json.id message.id
  json.content message.content
  json.name message.user.name
  json.created_at  message.created_at.strftime('%Y/%m/%d %R')
  json.image   message.image.url
end
