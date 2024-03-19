class UserController {
    constructor(userService) {
        this.userService = userService;
    }

    createUser = async (req, res) => {
        try {
            const userDetails = req.body;
            const confirmPassword = req.body.confirmPassword;

            const user = await this.userService.registerUser(userDetails, confirmPassword);
            res.status(201).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    getUsers = async (req, res) => {
        try {
            const users = await this.userService.getAllUsers();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ error: 'Erro interno do servidor' });
        }
    };

    getUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const user = await this.userService.getUserById(userId);
            if (!user) {
                res.status(404).json({ message: 'Usuário não encontrado' });
                return;
            }
            res.status(200).json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    updateUser = async (req, res) => {
        try {
            const userId = req.params.id;
            const userDetails = req.body;

            const updatedUser = await this.userService.updateUser(userId, userDetails);
            res.status(200).json(updatedUser);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    deleteUser = async (req, res) => {
        try {
            const userId = req.params.id;
            await this.userService.deleteUser(userId);
            res.status(204).end();
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };

    login = async (req, res) => {
        try {
            const { email, password } = req.body;
            const token = await this.userService.authenticate(email, password);
            res.status(200).json({ token });
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Erro interno do servidor' });
            }
        }
    };
}

export default UserController;
