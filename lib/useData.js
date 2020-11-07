import useSWR from 'swr';
import {firestoreGet} from '../lib/firestoreApi'

export function useData(currentSeason){
  const options = {
    revalidateOnFocus: false, // Change when deployed.
    shouldRetryOnError: false,
    
  };


	const { data: seasonList } =     useSWR(['Seasons',null], firestoreGet, options);
  const { data: instructorData } = useSWR( () =>
                                    ['Instructors',
                                      currentSeason?
                                        currentSeason:seasonList[0]
                                    ], 
                                    firestoreGet, 
                                    options);

  const { data: schoolData } =     useSWR( () =>
                                    ['Schools',
                                      currentSeason?
                                        currentSeason:seasonList[0]
                                    ], 
                                    firestoreGet, 
                                    options);
	

	return {seasonList, instructorData, schoolData};
}
  