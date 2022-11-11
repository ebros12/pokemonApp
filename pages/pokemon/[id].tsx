import { useEffect, useState } from 'react';

import { NextPage, GetStaticProps, GetStaticPaths } from 'next';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';

import { Layout } from '../../components/layout/Layout';
import { pokeApi } from '../../api';
import { Pokemon } from '../../interfaces';
import Image from 'next/image';
import { localFavorites } from '../../utils';
import confetti from 'canvas-confetti';
import { getPokemonInfo } from '../../utils';

interface Props {
    pokemon: Pokemon;
}
const PokemonPage: NextPage<Props> = ({pokemon}) => {

const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite(pokemon.id)
        setIsInFavorites(!isInFavorites)

        if(isInFavorites) return;
            confetti({
                zIndex:999,
                particleCount: 100,
                spread: 160,
                angle:-100,
                origin:{
                    x:1,
                    y:0
                }

            })
        
    }

    
  return (
    <Layout title={pokemon.name}>
        <Grid.Container css={{ marginTop:'5px' }} gap={2}>
            <Grid xs={12} sm={4}>
                <Card hoverable clickable css={{ padding:'30px' }}>
                    <Card.Body>
                        <Card.Image 
                            src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                            alt={ pokemon.name }
                            width="100%"
                            height={200}
                        />
                    </Card.Body>

                </Card>
            </Grid>

            <Grid xs={12} sm={8}>
                <Card>
                    <Card.Header css={{ display:'flex', justifyContent:'space-between' }}>
                        <Text h1 transform='capitalize'>{pokemon.name}</Text>
                        <Button
                        color="gradient"
                        ghost={!isInFavorites}
                        onClick={onToggleFavorite}
                        >
                            {isInFavorites ? "En Favoritos" : "Guardar en Favoritos"}
                        </Button>
                    </Card.Header>

                    <Card.Body>
                        <Text size={30}>Sprites</Text>
                        <Container direction='row' display='flex' gap={0}>
                            <Image
                                src={pokemon.sprites.front_default}
                                alt={pokemon.name}
                                width={100}
                                height={100}
                            ></Image>

                            <Image
                                src={pokemon.sprites.back_default}
                                alt={pokemon.name}
                                width={100}
                                height={100}
                            ></Image>

                            <Image
                                src={pokemon.sprites.front_shiny}
                                alt={pokemon.name}
                                width={100}
                                height={100}
                            ></Image>

                            <Image
                                src={pokemon.sprites.back_shiny}
                                alt={pokemon.name}
                                width={100}
                                height={100}
                            ></Image>
                        </Container>
                    </Card.Body>

                    
                </Card>
            </Grid>
        </Grid.Container>
    </Layout>
  )
};

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const pokemon151 = [...Array(151)].map( (value, index) => `${index + 1}`);

    return {
        paths:pokemon151.map(id => ({
            params:{id}
        })),
        fallback: false
    }
}


export const getStaticProps: GetStaticProps = async ({params}) => {
    const {id} = params as {id:string};

    return {
      props: {
        pokemon: await getPokemonInfo( id )
      }
    }
  }



export default PokemonPage;
