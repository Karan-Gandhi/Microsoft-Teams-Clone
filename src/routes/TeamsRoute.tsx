import React, { useEffect, useState } from "react";
import { Route } from "react-router";
import AddIcon from "@mui/icons-material/Add";
import DefaultLoader from "../components/DefaultLoader";
import TeamCard from "../components/TeamComponents/TeamCard";
import { getTeamByID, getUserTeams } from "../utils/TeamUtils";
import JoinTeamDialoge from "../components/Dialogues/JoinTeamDialoge";
import IndividualTeamRoute from "./IndividualTeamRoute";

interface TeamsRouteProps {}

const TeamsRoute: React.FC<TeamsRouteProps> = () => {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [teamDisplay, setTeamDisplay] = useState<React.ReactNode>();
  const [teamRoutes, setTeamRoutes] = useState<React.ReactNode>();
  const [joinTeamDialogueIsVisible, setJoinTeamDialogueIsVisible] = useState<boolean>(false);

  useEffect(() => {
    getUserTeams()
      .then(async (teams) => {
        setTeamDisplay(
          await Promise.all(
            teams.data.teams.map(async (teamID) => {
              const data = (await getTeamByID(teamID)).data;
              return <TeamCard key={data.id} {...data} />;
            })
          )
        );
        const _teamRoutes = await Promise.all(
          teams.data.teams.map(async (teamID) => {
            const data = (await getTeamByID(teamID)).data;
            return (
              <Route key={data.id} path={`/teams/${teamID}`} exact>
                <IndividualTeamRoute {...data} />
              </Route>
            );
          })
        );

        setTeamRoutes(_teamRoutes);

        setLoading(false);
      })
      .catch((error) => {});
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen">
      <Route path="/teams" exact>
        {isLoading && (
          <div className="h-screen w-full">
            <DefaultLoader />
          </div>
        )}
        {!isLoading && (
          <div className="w-full h-screen px-8 py-4">
            <JoinTeamDialoge dialogueIsOpen={joinTeamDialogueIsVisible} setDialogueOpen={setJoinTeamDialogueIsVisible} />

            <div className="flex py-4">
              <div className="flex-grow text-xl font-medium">
                <span>Teams</span>
              </div>
              <div>
                <AddIcon className="cursor-pointer rounded-full" onClick={() => setJoinTeamDialogueIsVisible(true)} />
              </div>
            </div>
            <div>
              <span style={{ color: "#adadad" }}>Your Teams</span>
              <div className="flex">{teamDisplay}</div>
            </div>
          </div>
        )}
      </Route>
      {teamRoutes}
    </div>
  );
};

export default TeamsRoute;
