export const success = ({ res, message = '', features = [], restOfProperties = {} }) => {
  return res.json({ message, payload: features, ...restOfProperties })
}
