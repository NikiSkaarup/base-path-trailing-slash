export const handle = async ({ event, resolve }) => {
  console.log(event.url);
  return resolve(event);
};
