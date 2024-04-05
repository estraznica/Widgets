export default function generateId() {
  let Id =
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  return Id;
}
