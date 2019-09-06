export default function formatMessage(id, messages) {
  return messages[id] ? messages[id] : id
}