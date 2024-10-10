import { useMutation, useQuery } from "@tanstack/react-query";

import axios from "@/configs/axios";
import { queryClient } from "@/configs/query-client";
import { League } from "@/types";

export const useAddLeagueMutation = () =>
  useMutation((leagueInput: FormData) => axios.post("leagues", leagueInput), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["leagues"],
      });
    },
  });

export const useGetLeaguesQuery = () =>
  useQuery({
    queryKey: ["leagues"],
    queryFn: async () => {
      const { data } = await axios.get<{ leagues: League[] }>("leagues");
      return data?.leagues;
    },
  });
