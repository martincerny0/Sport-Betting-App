import React from 'react';
import { api } from '~/utils/api';

interface ISportsListProps {
  changeSport(sport: string): void;
}

const SportsList: React.FC<ISportsListProps> = ({changeSport}) => {
  const { data: sportList, isLoading, isError } = api.sport.getAllSports.useQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>There was an Error loading data, <br></br> Please try again Later</div>;

  return (
    <div className="text-[#FAECDE] font-bold text-base gap-2 flex h-full items-center justify-center flex-col bg-gradient-to-b from-[#3A425A] to-[#0D263D] rounded-xl ease-in-out duration-300">
      {sportList?.map((sport) => (
        <>
        <button
          key={sport.id}
          className="border-hidden rounded-xl w-full ease-in-out duration-300 hover:m-1 hover:text-[#EEBC8A]"
          dangerouslySetInnerHTML={{ __html: `${sport.name} ${sport.unicode}` }}
          onClick={() => changeSport(sport.name)}
        />
        <hr className="w-3/4 border-[#EEBC8A] bg-[#EEBC8A] h-[1px]"></hr>
        </>
      ))}
    </div>
  );
};

export default SportsList;
