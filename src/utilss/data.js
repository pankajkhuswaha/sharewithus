
export const categories = [
  {
    name: 'cars',
    image: 'https://source.unsplash.com/50x50/?cars',
  },
  {
    name: 'fitness',
    image: 'https://source.unsplash.com/50x50/?fitness',
  },
  {
    name: 'wallpaper',
    image: 'https://source.unsplash.com/50x50/?wallpaper',
  },
  {
    name: 'websites',
    image: 'https://source.unsplash.com/50x50/?websites',
  },
  {
    name: 'photo',
    image: 'https://source.unsplash.com/50x50/?photo',
  },
  {
    name: 'food',
    image: 'https://source.unsplash.com/50x50/?food',
  },
  {
    name: 'nature',
    image: 'https://source.unsplash.com/50x50/?nature',
  },
  {
    name: 'art',
    image: 'https://source.unsplash.com/50x50/?art',
  }, {
    name: 'travel',
    image: 'https://source.unsplash.com/50x50/?travel',
  },
  {
    name: 'quotes',
    image: 'https://source.unsplash.com/50x50/?quotes',
  }, {
    name: 'cats',
    image: 'https://source.unsplash.com/50x50/?cats',
  }, {
    name: 'dogs',
    image: 'https://source.unsplash.com/50x50/?dogs',
  },
  {
    name: 'other',
    image: 'https://source.unsplash.com/50x50/?technology',
  },
];

export const feedQuery = `*[_type == "pin"] | order(_createdAt desc) {
  image{
    asset->{
      url
    }
  },
      _id,
      destination,
      postedBy->{
        _id,
        userName,
        image
      },
      save[]{
        _key,
        postedBy->{
          _id,
          userName,
          image
        },
      },
    } `;

export const pinDetailQuery = (pinId) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const SearchQuery = (searchTerm) => {
  const query = `*[_type == "pin" && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
        image{
          asset->{
            url
          }
        },
            _id,
            destination,
            postedBy->{
              _id,
              userName,
              image
            },
            save[]{
              _key,
              postedBy->{
                _id,
                userName,
                image
              },
            },
          }`;
  return query;
};

export const userQuery = (userId) => {
  const query = `*[_type == "user" && _id == '${userId}']`;
  return query;
};

export const userCreatedPinsQuery = (userId) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};