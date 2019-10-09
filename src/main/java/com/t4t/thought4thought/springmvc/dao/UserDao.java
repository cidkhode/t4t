import thought4thought.springmvc.model.Login;
import thought4thought.springmvc.model.User;

public class UserDao {
	void register(User user);

	User validateUser(Login login);
}
