import request from '../utils/request';
import * as Common from './common'

const CATEGORY_URL = '/api/categories'

export const fetch = async () => {
  const { data: categories } = await request(CATEGORY_URL)
  const data = categories
    .filter(category => !category.parent_id)
    .map((cat) => {
      const subCategories = categories.filter(c => cat.id === c.parent_id)
      return {
        ...cat,
        subCategories
      }
    })
  return { data }
}

export const remove = (id) => {
  return Common.remove(`${CATEGORY_URL}/${id}`)
}

export const create = (values) => {
  return Common.create(CATEGORY_URL, values)
}
