import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';


export default function Perfil() {
  const user = {
    name: "zzair",
    seguidores: 4,
    seguidos: 18,
    age: 18,
    social: "zair_bz",
    description: "asdadasd",
    favoritos: Array(8).fill(0), 
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.avatar} source={{ uri: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACUCAMAAABGFyDbAAAAyVBMVEU2NjbG6P+UvttxkqjI6v8AAADK7P9uj6WWwd7M7/8A3v8wLi3O8f8yMTBqi6HP8/91mLAqJiMWAACGrsmApsCOt9MfFQ0A4f9FSUxlcXkjHBdSWl95nreBoriZvNkvKygbDgC10+TB4fKUtcqnwtK32e+cyeiMoKyTqbRZY2k8PT+qy994iJKLrcOev9Vng5eFw+GClaBtfIOet8NMZHNDVWEoNT46SlUnKi4VGR0hHiM7QUwXdIM/bHtS0u8Am7AUq8Jsy+pedIMcROXeAAALe0lEQVR4nO1c63rauhLFYGQ7vsc4IQYCNvdrw6XN2eeS7ub9H+pIsglgSyPZkHb/yHxfGtKmZnlmvDSaWaJW+7Iv+7Iv+7J/nNl/GsC52aYfPQzu7wd+zcff7geRb/5RgDZG5Ee1zmq6H8VJavFoP9vOF77f7/8RcKZvtzu72VJ1XdcyEFJTQwhZlusa8Ww1b9d887disv2os5qNFNdCqsIyFVkuivfbuR39NmTmYLEaxSoP0gmagZLRtHPv/4Zo4nyajxAJGojpAxoy4p1tfrLLTL+zil0kg+jDkItmHbv/iaCizjSxyoGiPnOT2dOnJVm0mCVGeVAUmJGM2oPPyDHTXCFBkoPAkDFb3Dz5TXMXu5UxpcAstFr4N0UVdfaqcR0qCmw0j24Hyo52sVE9fmeGkun9rQJp2rPbgFJI7seL23CF34ndW6HCZiS7/g0c5u+S67Pq3HAgo6txDaaoGlXxTTX2V5YWdn92ywAezYjb1+AyFyNLzgGk0KImt4Rbcac6g9m1kUQAMX8byni53GyW2MZjXM+IoWF/VcY1GAmJQTUsZTns9bxGo6Hhr4bn9YZLRVSLEVwVGd+O9oLlRkXqeOM5jkYBHU3THMdbJqognCjuVMkvuzaDiUFFSTzEmE5wTug0p7FeKnAGGKMqed/fwoFAaNk7AiGIPK/b9bwTOE1bL+ErWMtBaVTRDs4rY7xOkwl7xmsFYT2zMGh52Ff0Hxo9BXS4tb8vicqfg3yF0OYYvW6o63r9zPBPQfcYyw2YYca0XNr7nQS6nDruUYdoXhBeQPpAFmKfkd9w1gmQYWryVGbdthcgYaElfU8eqBRZGNAga70xEEiUtEssj+YWyglrQ9PaafEgHdOsS3E1lsDFjFFTGlX/yeKHUEVDh7qK76mTx2iGORvA9e5KOr0iIB9UdUN90KoLURFc1GHOhr+yqslcMr0epgC7oxRVIMaUWov+OhBHtJdD5c+BpxAty6Gq6wSX1hhz/a+inUwY8VMI3JpCiSGQCOAlrt6Ye6sokekj4l0qF5Wa9Mh7lEGFjXCrM+Rf1Z0+SLgr5l+AJpbWLYcqw8VPLxWJ3RWt+PmOYpwlmlcSFCYwyhP8dRvNhO6KgEVMXZN8F/NV3vSAOJkfRjFJRFs+xaClQwmrvOmEvjz+04hmgsrLjvnOsshKWD6ExEgYtSH30mrSAbPLX/FjiGLsLKfkU3g0zBKYvLjXdlewu/YAZxFyaFRDVQ89kCRQAsEyAYJHY688ZZ2sS1Z3foK4cwCXDSX8pnJm1cnDSLiLn/TGCKifbT6Vqgpmh0qPYYaL+HrNvWvVWHCT3pzzqVQlMSy1GObdRbgLWEC23D7hA5DwKiEtLxS/P9cI6QEL9ohbR9xD+4ohjmH3ClQ6rbv4ScLdZJsdoLil9NCqHMOU6bU1f71WedVztIX2TtpVqVVPGbXHZ2tjxsn5CNiFqbT+K79Kn1lAYClAcrH3ZnYbWA/RmMK6AlU91MAiVVXZ62L/CazhyYN4jbPocu3xYSnujpnz/hZ4DtHmeliY+Dyg9LWmzKKrD/WzbgCrTviYzxBc5gLI9DawNIi4cNHF4nm7DbVDbpFbAm8pLstbNtg7+g0pr7gsnjefoJZiShDXoBIRBHkUGe4yn6DmkQrz1lk/kLzUJ5OiYwV0ih/FLQsWsEEk7mJu8o8/e8cFQCcvJ16zqRVwUVhQRKw9Y7toTsE5ispaqvXW4TuJ7KHZ/EH32nrwvdl8DX40m//K3wLpRQBLNbnz0aAIC6QtDItZ2Lw2m38FeoC/NX98m0wmrR/0Ff7z3wVYpDzdlIYl8BZilIE6cUsTuxB7C9vrO8GDYQX/aTb/+5KPNy0DwZZszKjnRd6KGck1+V+zeQhxQn1vnuxHoL/9/PvxLYeKFM1AH4LAGjNgmRDJZz2k3Bbj+dfdz5+/6JN3+OuI6jXUX+4eHwuw4C1G+hasIALdNnovw8KG7Pnt+Pa67r2mqA6hjtFiuwwi7e46wEJNYbEIAvYWTq5Cd1J/u7t7/PWcvq4H3w6vB9LppbDeLsOtt+BeUgqLsSgKcktRaTV/sf68UK88H98ZP4mURSnaXAzpZn8jEHwxc2smmP+mfaTzpP/1iGEV6ZzAuvv1fPFXtOEMrTwK50kUEARxl5bLrjcM6+25nreXYmrRRtJaNPhcsmBtRdKerO324Z7nu4JXUlgFJ9K2G1jU0Osz6XQlHOIj2qQMLmDlWZPlRD0g9wMuPMSMGSPlzScxrLF33tJ9vntkwSJoHy+cSEPYAEeBxCxWG8Kci3UCdN5zCiNmzbtiDOsFJ5IQAg3wo7HrLWimcoSFuufjgpe3N0YMaWqdoU3HGGuxooLZesO7V/H/VBPnnFSfGb4isb2IYTpcEd+z4rL2iYKJa2YGHZDBzYiXtzyqBjCKOt2ywuxwmQKaTy0dcoK9m+d6HpUj4gZ6ZfY+0YcaNqd7yoavXV1qG5SNOWVu2GKP+cEexAWudH4e1oWdkjCVSkBD4ZO5T8weBNixOcdl0BE60YmAHV49bGUjdCnxlKpwJhmRTAaQC6jLTLECtOn1estLNS1jOUkXWnK0B9FUVm5H6Z6+KddXQaYb6UHyjHMzeOMosyOtTUTZA8kZLuph6k7Ng8UsZ8bvndYGUjmfXWWoabww6plgRFuPpVXQ/E4z2Jcv4lpSSRJDpaHT3kzD6YkUXOcG9OWhKQYDl7HUmGPPkCQeTnVJ+WIGC1CP2LL5mRlhMK3AXpQX1hLLzflNIv7Mp2aLCufctRKP5a60YCh3g+CETKa4ubgYcVc3v/UisEq6HVM8KB0pkfTKccaYg0U8OCzldc7O9WTQrJphBm3j5GDB80y2WVtQcWBDmhEGLDr6LHrLGRulbk802ccLUIkoIpryOXUS2dZrPUUZlzjkYswgZy3w132J0ylptyRPEHT35ThOQ3KNBhn+w11wC/UCFYdOP/SoPcmSBLE2iHmXyWYXiumqWGBTPczKi4bTlTrDAY3PP6wv3l2nF1O8i03jubWOWtm1DC5XLEiSFcnjJbHHRUUKUy9drkXtEEWkGPkwX6amp7IIQGGGNyC00Qap3LIrIfYcsYhrJs56Y03KQFCAoAdU2w+IO1Nn7SWPGNsPQs8bGwnpYtpcdiDxcBndKV6xBZmKxlpDQiSY4oJ31NZWRq+Y+WsGt4QVmu5i+XAm7gTmTxZU0BRgwW2SrJ8kIx9uwapAVO7ATx8KI1UB4T2PzG6fUiu3BYGfwnLn3CJABG705BUkqQjcYVeFKiBD4tiAe0IkHcTKipNSgRRbxOKChQPbTN6hRAugdxYuml6sSYEVVzgRaPf3bM+P6WonCYqYx1ZRVjzfZkeswl6lUt3iLgxwF200F8bBKO5UO9Zp9xlDs3QiVU4j2GJ0mo3qZ+5Y0nnqrLJiPFpNXBQARlL9xB0pcnJ5TwcspeVloZNrgRtVI5jhup9d5oSRH0dJWX7mY+yvPS7sb8+37UZheCdp3llvXnVntasPMZu7E0XjkrRRSWqTinSXFBZC25ucYG5/HEFPDz1UkuKRgw8aKSWMBG43SJsZzVKHpdP9SuJT6i5tbSE0Wtzs2L6/i0npm2khqsBKs14bJ9tbfsCHv9i7CNdZ1wiIySOszW+RViez/acY0bFdZaUuLiUOt/9gG9/fjq6RxOrB+/W0wLJocXC8ikJ+va4JekXVzbbbhxZDxya0yaTRsT/zs2xM+z2oy83sjn7S9VCzP/2Tf3z/uyeNjGDqvddu+AEjfOv32++NkKVKzIOahN77976A1BeLWwGz+7X2/Ntwwoem6xOM6ald6//mz7qy/cieO0EYZsE6WZ2cRW+8t6O+/Wc+tsz0H/rtzuH9W8Pr9nqtXq/nad/e3zvt/kN0Wzovbbbd9/3Ix8HCOYJf+v6fchLH/lFgvuzLWPZ/UUIQ0vsUTagAAAAASUVORK5CYII=' }} />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.followers}>
          {user.seguidores} Seguidores | {user.seguidos} Seguidos
        </Text>
        <Text style={styles.info}>
          {user.age}{user.pronouns} | {user.social}
        </Text>
        <Text style={styles.description}>
          {user.description}
        </Text>

        {/* Botón de Configuración */}
        <TouchableOpacity style={styles.configButton}>
          <Text style={styles.configButtonText}>Configuraciones</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Favoritos</Text>
        <View style={styles.highlightGrid}>
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
        <View style={styles.box} />
      </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#A3966A',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: 5,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#482E1D',
  },
  followers: {
    fontSize: 14,
    color: '#482E1D',
  },
  info: {
    fontSize: 14,
    color: '#F0DAAE',
    marginVertical: 5,
  },
  description: {
    fontSize: 14,
    color: '#F0DAAE',
    marginBottom: 15,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  configButton: {
    backgroundColor: '#482e1d',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  configButtonText: {
    color: '#F0DAAE',
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e412f',
  },
  highlightGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    backgroundColor: '#A3966A',
    paddingTop: 20,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  box: {
    width: '30%',
    height: 150,
    backgroundColor: '#482e1d',
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#f0daae',
  },
});
