export const setType = type => {
    if (
      type !== 'normal' &&
      type !== 'fighting' &&
      type !== 'flying' &&
      type !== 'poison' &&
      type !== 'ground' &&
      type !== 'rock' &&
      type !== 'bug' &&
      type !== 'ghost' &&
      type !== 'steel' &&
      type !== 'fire' &&
      type !== 'water' &&
      type !== 'grass' &&
      type !== 'electric' &&
      type !== 'psychic' &&
      type !== 'ice' &&
      type !== 'dragon' &&
      type !== 'dark' &&
      type !== 'fairy'
    ) {
      return 'default-type';
    } else {
      return `${type}-type`;
    }
  };
  
  export const loader = () => {
    const pokeAvatars = document.querySelectorAll('#pokelist > li');
    pokeAvatars.forEach(avatar => {
        avatar.classList.replace('fadeIn', 'fadeOut');
    });
  };
  