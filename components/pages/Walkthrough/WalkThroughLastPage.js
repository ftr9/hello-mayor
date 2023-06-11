import { View, Text } from 'react-native';
import React from 'react';
import P from '@components/Typography/P';
import { Avatar, Button } from '@rneui/themed';

const myTeams = [
  {
    id: 1,
    name: 'Rahul Dotel',
    role: 'Team Lead',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-lhU0s-tqLJvACdV57eWE1uR4wyY8OtDmHA&usqp=CAU',
  },
  {
    id: 2,
    name: 'Sushrina Dhakal',
    role: 'QA engineer',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkS0YAVrqDp8u-zsuE453BqaSSpj0HUG_mDQ&usqp=CAU',
  },
  {
    id: 3,
    name: 'Nihang Lama',
    role: 'Database Designer',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT37z80AaYeKk2nW9RyteIL7qN0Em6R4F4Vug&usqp=CAU',
  },
  {
    id: 4,
    name: 'Smaran Sapkota',
    role: 'Product Manager',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBsCEuH0O_1uO8bLJwYAqFo-T-OAcGcTAzHw&usqp=CAU',
  },
  {
    id: 5,
    name: 'Shreenav Dhakal',
    role: 'Developer',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoaOZcE1FT504PSsGAN6hT1eqESeyadTl7xg&usqp=CAU',
  },
  {
    id: 6,
    name: 'Bigesh Gurung',
    role: 'QA engineer',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUWDO1su5xHOwMnyDz4SpGAuMjZPbSHwwJ4Q&usqp=CAU',
  },
  {
    id: 7,
    name: 'Rishav shrestha',
    role: 'Developer',
    imgUrl:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR22tlXecXNVCQDwqKb67rr9T7HnrbNVbk4XQ&usqp=CAU',
  },
];

const WalkThroughLastPage = ({ key }) => {
  return (
    <View key={key} className=" px-3 h-[85%]  justify-center">
      <P extraStyle={'mb-7'} size={28} type="bold">
        Meet Our Teams
      </P>
      <View className="space-y-4">
        {myTeams.map(team => {
          return (
            <View
              className="flex-row items-center justify-between"
              key={team.id}
            >
              <View className="flex-row items-center space-x-3">
                <Avatar
                  source={{
                    uri: team.imgUrl,
                  }}
                  rounded
                  size={45}
                  containerStyle={{
                    marginRight: 15,
                  }}
                />
                <P>{team.name}</P>
              </View>
              <View className="bg-bgTertiary py-2 px-3 rounded-full">
                <P size={12} extraStyle="text-white">
                  {team.role}
                </P>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default WalkThroughLastPage;
