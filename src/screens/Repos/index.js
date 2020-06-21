import React, { useState, useEffect } from 'react';
import { FlatList, Linking } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import api from '../../services/api';

// Components
import { Header, Loading, Alert, Button } from '../../components';

// Global Styles
import { Container } from '../../styles';

// Local Styles
import { Item, RepoText, ButtonBase, RepoInfo, InfoItem, InfoIcon, InfoName } from './styles';

// Images
import eyeIcon from '../../assets/icons/eye.png';
import forkIcon from '../../assets/icons/version.png';
import starIcon from '../../assets/icons/star.png';

const Repos = ({ route, navigation }) => {
  const { user, avatar } = route.params;

  const [showWebview, setShowWebview] = useState({
    show: false,
    url: ''
  });
  const [repos, setRepos] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    findRepos();
  }, [])

  const findRepos = async () => {
    setLoading(true);

    try {
      const response = await api.get(`/users/${user}/repos`);

      setRepos(response.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      Alert('Algo deu errado!', 'Não foi possivel carregar os repositórios do usuário!');
      navigation.goBack();
    }
  }

  const pushToGithub = (url) => {
    Linking.openURL(url);
  }

  return (
    <Container>
      {loading && <Loading content="Aguarde..." />}

      <Header
        backButton
        title="Repositórios"
        avatar={avatar}
      />
      <FlatList
        keyExtractor={(repo) => String(repo.id)}
        data={repos}
        contentContainerStyle={{
          paddingBottom: getBottomSpace()
        }}
        renderItem={({ item }) => (
          <Item key={item.id}>
            <RepoText bold size={16}>{item.name}</RepoText>
            <RepoText size={12}>{item.description}</RepoText>
            <RepoInfo>
              <InfoItem>
                <InfoName>
                  <InfoIcon source={eyeIcon} />
                  <RepoText>Watch</RepoText>
                </InfoName>
                <RepoText size={18}>{item.watchers_count}</RepoText>
              </InfoItem>
              <InfoItem>
                <InfoName>
                  <InfoIcon source={starIcon} />
                  <RepoText>Star</RepoText>
                </InfoName>
                <RepoText size={18}>{item.stargazers_count}</RepoText>
              </InfoItem>
              <InfoItem>
                <InfoName>
                  <InfoIcon source={forkIcon} />
                  <RepoText>Fork</RepoText>
                </InfoName>
                <RepoText size={18}>{item.forks_count}</RepoText>
              </InfoItem>
            </RepoInfo>
            <ButtonBase>
              <Button
                content="Ir para o Github"
                onPress={() => pushToGithub(item.svn_url)}
              />
            </ButtonBase>
          </Item>
        )}
      />
    </Container>
  )
}

export default Repos;