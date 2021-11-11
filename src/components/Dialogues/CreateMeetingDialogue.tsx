import { useState } from "react";
import { useSnackbar } from "../../Snackbar";
import { TeamID } from "../../types/Team";
import { currentFormattedDate, getFutureFormattedTime } from "../../utils/BrowserUtils";
import { createMeeting } from "../../utils/MeetingUtils";
import PrimaryButton from "../PrimaryButton";
import PrimaryTextfield from "../PrimaryTextfield";
import Dialogue, { DialogueProps } from "./Dialogue";

interface CreateMeetingDialogueProps extends DialogueProps {
  teamID: TeamID;
}

const CreateMeetingDialogue: React.FC<CreateMeetingDialogueProps> = ({ teamID, ...rest }) => {
  const [meetingName, setMeetingName] = useState<string>("Untitled");
  const [meetingStartDate, setMeetingStartDate] = useState<string>(currentFormattedDate());
  const [meetingStartTime, setMeetingStartTime] = useState<string>(getFutureFormattedTime(5));

  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async () => {
    if (meetingName === "") return enqueueSnackbar("Please enter a meeting name");

    const meetingDateTime = new Date(`${meetingStartDate} ${meetingStartTime}`);

    console.log(meetingDateTime, new Date());
    if (meetingDateTime.getTime() < Date.now()) return enqueueSnackbar("Please enter a valid meeting date and time");

    try {
      await createMeeting(meetingName, meetingDateTime.getTime(), teamID);
      enqueueSnackbar("Sucessfully scheduled a meeting");
    } catch {
      enqueueSnackbar("Failed to create meeting");
    }
  };

  return (
    <Dialogue {...rest}>
      <div className="flex flex-col flex-grow">
        <div className="flex flex-grow flex-col">
          <div className="">
            <div className="my-2 text-xl font-medium">
              <span>Meeting Name</span>
            </div>
            <PrimaryTextfield value={meetingName} onChange={(value) => setMeetingName(value)} placeholder="Enter a name" />
          </div>

          <div>
            <div className="my-2 text-xl font-medium">
              <span>Meeting Start date</span>
            </div>
            <div>
              <PrimaryTextfield type="date" value={meetingStartDate} onChange={(value) => setMeetingStartDate(value)} placeholder="" />
            </div>
          </div>

          <div>
            <div className="my-2 text-xl font-medium">
              <span>Meeting Start Time</span>
            </div>
            <div>
              <PrimaryTextfield type="time" value={meetingStartTime} onChange={(value) => setMeetingStartTime(value)} placeholder="" />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end">
          <div className="mb-2">
            <PrimaryButton onClick={handleSubmit}>Schedule</PrimaryButton>
          </div>
        </div>
      </div>
    </Dialogue>
  );
};

export default CreateMeetingDialogue;
