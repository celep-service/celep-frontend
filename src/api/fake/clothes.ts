import type { ClothesListResponse } from '@/model/Clothes'

export const FAKE_CLOTHES_LIST_RESPONSE: ClothesListResponse = {
  isSuccess: true,
  code: 200,
  message: 'OK',
  data: {
    content: [
      {
        createdAt: '2023-12-10T01:11:34.843816',
        updatedAt: '2023-12-10T01:11:34.843816',
        id: 97,
        name: '청바지',
        clothesCategory: 'BOTTOM',
        brand: '나이키',
        gender: '남성',
        imageUrl: 'https://i.postimg.cc/tTHmkBgn/image.jpg',
        sellUrl: 'naver.com'
      },
      {
        createdAt: '2023-12-10T06:08:20.618954',
        updatedAt: '2023-12-10T06:08:20.618954',
        id: 98,
        name: '티셔츠',
        clothesCategory: 'TOP',
        brand: '나이키',
        gender: '남성',
        imageUrl: 'https://i.postimg.cc/tTHmkBgn/image.jpg',
        sellUrl: 'naver.com'
      },
      {
        createdAt: '2023-12-10T06:08:36.874357',
        updatedAt: '2023-12-10T06:08:36.874357',
        id: 99,
        name: '티셔츠',
        clothesCategory: 'TOP',
        brand: '나이키',
        gender: '남성',
        imageUrl: 'https://i.postimg.cc/tTHmkBgn/image.jpg',
        sellUrl: 'naver.com'
      }
    ],
    pageable: {
      pageNumber: 1
    },
    last: true
  }
}
