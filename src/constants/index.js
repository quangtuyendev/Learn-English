export const STATUS_CODE = {
  SUCCESS: 200,
  CREATED: 201,
  ERROR: 404,
};

export const GOOGLE_TRANSLATE_URL =
  'https://translate.google.com/?hl=vi#view=home&op=translate&sl=en&tl=vi&text=';

export const SORTS = [
  {
    name: 'From A to Z',
    sort: { sortBy: 'name', sortValue: 1 },
  },
  {
    name: 'From Z to A',
    sort: { sortBy: 'name', sortValue: -1 },
  },
  {
    name: 'Recently words',
    sort: { sortBy: 'date', sortValue: 1 },
  },
  {
    name: 'Old words',
    sort: { sortBy: 'date', sortValue: -1 },
  },
];

export const LINKS = [
  {
    path: '/signin',
    name: 'Sign in',
  },
  {
    path: '/signup',
    name: 'Sign up',
  },
];
