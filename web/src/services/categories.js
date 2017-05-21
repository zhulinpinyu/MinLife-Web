import request from '../utils/request';

export const fetch = async () => {
  const { data: categories } = await request('/api/categories')
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

export const remove = async (id) => {
  await request(`/api/categories/${id}`, {
    method: 'DELETE'
  })
}
