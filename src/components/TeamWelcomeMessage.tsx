interface TeamWelcomeMessageProps {
  teamName: string;
}

const TeamWelcomeMessage: React.FC<TeamWelcomeMessageProps> = ({ teamName }) => {
  return (
    <div className="mb-8">
      <div>
        <div className="text-5xl my-3" style={{ color: "#9ea2ff" }}>
          <span>Welcome to the {teamName} Team!</span>
        </div>
        <div style={{ color: "#989898" }} className="text-lg">
          <span>Try @mentioning the member to start a conversation.</span>
        </div>
      </div>
      <div>{/* <img src={TeamWelcomeImage} alt="" /> */}</div>
    </div>
  );
};

export default TeamWelcomeMessage;
