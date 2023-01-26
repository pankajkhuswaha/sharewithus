import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
export const client = sanityClient({
    projectId:process.env.REACT_APP_SANITY_PROJECT_TOKEN_ID,
    dataset:'production',
    apiVersion:'2023-01-01',
    useCdn:true,
    token:process.env.REACT_APP_SANITY_PROJECT_API ,
})
const builder = imageUrlBuilder(client);
export const urlfor =(source) => builder.image(source);