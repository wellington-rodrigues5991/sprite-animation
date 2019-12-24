import CustomVcc from '@withkoji/custom-vcc-sdk';

export const customVcc =  new CustomVcc();
customVcc.onUpdate((newProps) => {
            console.log(newProps)
        });

customVcc.onTheme((theme) => {
    console.log(theme)
});